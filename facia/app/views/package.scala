package views

import common.Edition
import model.{ApplicationContext, PressedPage}
import play.api.mvc.RequestHeader
import views.support.{BulletCleaner, CommercialComponentHigh}
import views.support.`package`.withJsoup

object FrontsCleaner {
 def apply(page: PressedPage, html: String)(implicit request: RequestHeader, context: ApplicationContext) = {
    val edition = Edition(request)
    withJsoup(BulletCleaner(html))(
      CommercialComponentHigh(page.frontProperties.isAdvertisementFeature, page.isNetworkFront, page.metadata.hasPageSkin(edition))
    )
  }
}
